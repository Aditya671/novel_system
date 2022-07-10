import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';


const RouteWithSubRoutes = ({route}) => {
    return (
    <Route
        path={route.path}
        render={(props) => (
            <route.component {...props} routes={route.routes} />.
        )}
    />
    );
};
RouteWithSubRoutes.propTypes = {
	route : PropTypes.oneOf('array','object');
}
export default RouteWithSubRoutes;