import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if(!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }


    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>   
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data; 

    const imgUrl = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    let imgStyle = {objectFit: "cover"}
    if(thumbnail === imgUrl ) {
        imgStyle = {objectFit: "contain"}
    }
    return (
        <>
            <div className="char__basics">
                    <img style={imgStyle} src={thumbnail} alt={name}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'There is no comics with this character'}
                    {
                        comics.map((item, i) => {
                            // eslint-disable-next-line
                            if(i > 9) return;
                            return (
                                <li style={{'cursor': 'pointer'}} key={i} className="char__comics-item">
                                    <NavLink end  to={`/comics/${item.resourceURI.slice(43)}` } >{item.name}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;