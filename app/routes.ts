import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/inicio", 'routes/inicio.tsx'),
    route("inicio/agendar", 'routes/agendar.tsx')
] satisfies RouteConfig;
