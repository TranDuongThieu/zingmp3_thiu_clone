import actionTypes from "../actions/actionTypes";

const initialState = {
    width: 0,
    homedata: [],
    banner: [],
    new_releases: [],
    home_radio: [],
    week_chart: [],
    chart: [],
    rank: [],
};
export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_HOME: {
            return {
                ...state,
                banner:
                    action.homeData?.filter(
                        (item) => item.sectionType === "banner"
                    ) || null,
                new_releases:
                    action.homeData?.filter(
                        (item) => item.sectionType === "new-release"
                    ) || null,
                home_radio: action.homeData?.filter(
                    (item) => item.sectionType === "livestream"
                ),
                week_chart:
                    action.homeData?.filter(
                        (item) => item.sectionType === "weekChart"
                    ) || null,
                chart:
                    action.homeData?.find((item) => item.sectionId === "hZC")
                        ?.chart || null,
                rank:
                    action.homeData?.find((item) => item.sectionId === "hZC")
                        ?.items || null,
                homedata: action.homeData,
            };
        }
        case actionTypes.SET_CURRENT_WIDTH: {
            return { ...state, width: action.width };
        }
        default:
            return state;
    }
}
