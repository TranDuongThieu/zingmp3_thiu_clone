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
]
export const libraryMenu = [
    {
        path:'mymusic/song',
        text:"Bài Hát",
        icon:<SongIcon/>
    },
    {
        path:'mymusic/playlist',
        text:"Playlist",
        icon:<PlaylistIcon/>
    },
    {
        path:'mymusic/recent',
        text:"Gần Đây",
        icon:<ClockIcon/>
    },
]