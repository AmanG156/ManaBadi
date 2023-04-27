import constant from '../constant';

const setLoading = (isLoading) => (dispatch) => {
  dispatch({
    type: isLoading ? constant.SHOW_LOADER : constant.HIDE_LOADER,
  });
};
export default setLoading;
