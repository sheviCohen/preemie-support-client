import { createBrowserRouter } from "react-router";
import App from "../App";
import Protected from "./protected";
import Chats from "../pages/chats";
import Home from "../pages/home"
import Enterance from "../pages/enterance";
import Articles from "../pages/articles";
import ProfileMother from "../pages/profile";
import FullArticle from "../pages/fullArticle";

import Calendar from "../pages/calendar";
import EditArticle from "../pages/editArticle";
import AddArticle from "../pages/addArticle";
import NotFound from "../pages/notFound";







const routes = createBrowserRouter([
    {
        path: "/enterance",
        element: <Enterance />
    },
    {
        element: <Protected />,
        children: [
            {
                path: "/",
                element: <App />,
                children: [


                    {
                        index: true,
                        element: <Home />
                    },
                    {
                        path: "chats",
                        element: <Chats></Chats>
                    },

                    {
                        path: "articles",
                        element: <Articles></Articles>,
                    },
                    {
                        path: "articles/:id",
                        element: <FullArticle></FullArticle>
                    },
                    {
                        path: "profile",
                        element: <ProfileMother></ProfileMother>
                    },
                    {
                        path: "calendar",
                        element: <Calendar></Calendar>
                    },
                    {
                        path: "articles/new",
                        element: <AddArticle></AddArticle>
                    },
                    {
                         path: "articles/:id/edit",
                         element: <EditArticle></EditArticle>
                    },

                    {
                        path: "*",
                        element: <NotFound></NotFound>
                    }
                ]
            },
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    }
])

export default routes