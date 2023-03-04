import {  CategoryIcon, ClockIcon, DishIcon, FollowIcon, MusicIcon, MusicVideoIcon, PersonalIcon, PlaylistIcon, RadioIcon, SongIcon, StarIcon } from "./icons";
export const sidebarMenu = [
    {
        path: "/mymusic",
        text: "Cá Nhân",
        icon: <PersonalIcon/>,
    },
    {
        path: "",
        text: "Khám Phá",
        end: true,
        icon: <DishIcon/>,
    },
];
export const bottomSidebarMenu = [
    {
        path:'/moi-phat-hanh',
        text:"Nhạc Mới",
        icon:<MusicIcon/>
    },
    {
        path:'/top100',
        text:"Top 100",
        icon:<StarIcon/>
    },
    {
        path:'/mv',
        text:"MV",
        icon:<MusicVideoIcon/>
    },
]
export const libraryMenu = [
    {
        path:'/baihat',
        text:"Bài Hát",
        icon:<SongIcon/>
    },
    {
        path:'/playlist',
        text:"Playlist",
        icon:<PlaylistIcon/>
    },
    {
        path:'/ganday',
        text:"Gần Đây",
        icon:<ClockIcon/>
    },
]