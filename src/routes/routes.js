import config from '~/config';

import Home from '~/pages/Home';
import Catalog from '~/pages/Catalog';
import Details from '~/pages/Details/Details';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.category, component: Catalog },
    { path: config.routes.details, component: Details },
    { path: config.routes.search, component: Catalog },
];
