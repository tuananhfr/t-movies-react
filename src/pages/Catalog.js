import PageHeader from '~/components/PageHeader';
import { useParams } from 'react-router-dom';
import { category as cate } from '../api/tmdbApi';
import MovieGrid from '~/components/MovieGrid';

function Catalog() {
    const { category } = useParams();
    return (
        <>
            <PageHeader>{category === cate.movie ? 'Movie' : 'TV Series'}</PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid cate={category} />
                </div>
            </div>
        </>
    );
}

export default Catalog;
