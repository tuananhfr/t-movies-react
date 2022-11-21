import './MovieGrid.scss';
import MovieCard from '../MovieCard/MovieCard';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import tmdbApi, { category, movieType, tvType } from '~/api/tmdbApi';
import Button, { OutlineButton } from '../Button/Button';
import Input from '../Input';
function MovieGrid({ cate }) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const { keyword } = useParams();

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (cate) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(movieType.upcoming, {
                            params,
                        });
                        break;
                    default:
                        response = await tmdbApi.getTvList(tvType.popular, { params });
                }
            } else {
                const params = {
                    query: keyword,
                };
                response = await tmdbApi.search(cate, { params });
            }
            setItems(response.results);
            setTotalPage(response.total_pages);
        };
        getList();
    }, [cate, keyword]);

    const loadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1,
            };
            switch (cate) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(movieType.upcoming, {
                        params,
                    });
                    break;
                default:
                    response = await tmdbApi.getTvList(tvType.popular, { params });
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword,
            };
            response = await tmdbApi.search(cate, { params });
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    };
    return (
        <>
            <div className="section mb-3">
                <MovieSearch cate={cate} keywords={keyword} />
            </div>
            <div className="movie-grid">
                {items.map((item, i) => (
                    <MovieCard cate={cate} item={item} key={i} />
                ))}
            </div>
            {page < totalPage ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className="small" onClick={loadMore}>
                        Load More
                    </OutlineButton>
                </div>
            ) : null}
        </>
    );
}

function MovieSearch({ cate, keywords }) {
    const navigate = useNavigate();
    const [keyword, setKeyWord] = useState(keywords ? keywords : '');

    const goToSearch = useCallback(() => {
        if (keyword.trim().length > 0) {
            navigate(`/${category[cate]}/search/${keyword}`);
        }
    }, [keyword, cate, navigate]);

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        };
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>
                Search
            </Button>
        </div>
    );
}

export default MovieGrid;
