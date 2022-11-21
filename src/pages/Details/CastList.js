import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '~/api/apiConfig';
import tmdbApi from '~/api/tmdbApi';

function CastList({ id }) {
    const { category } = useParams();
    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, id);
            setCasts(res.cast.slice(0, 5));
        };
        getCredits();
    }, [category, id]);
    return (
        <div className="casts">
            {casts.map((cast, i) => (
                <div className="casts_item" key={i}>
                    <div
                        className="casts__item__img"
                        style={{
                            backgroundImage: `url(${apiConfig.w500Image(cast.profile_path)})`,
                        }}
                    ></div>
                    <p className="casts__item__name">{cast.name}</p>
                </div>
            ))}
        </div>
    );
}

export default CastList;
