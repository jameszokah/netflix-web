import { randomize } from "../utils/randomize";
import blueAvatar from "../img/blue-avatar.jpg";
import bluegirlAvatar from "../img/bluegirl-avatar.jpg";
import bluelackAvatar from "../img/bluelack-avatar.png";
import deepgreenAvatar from "../img/deepgreen-avatar.png";
import greenAvatar from "../img/green-avatar.png";
import lightgreen1Avatar from "../img/lightgreen1-avatar.png";
import lightgreen2Avatar from "../img/lightgreen2-avatar.png";
import orangeAvatar from "../img/orange-avatar.jpg";
import redAvatar from "../img/red-avatar.png";
import redbirdAvatar from "../img/redbird-avatar.jpg";
import yellowAvatar from "../img/yellow-avatar.png";
import yellowbirdAvatar from "../img/yellowbird-avatar.png";

const useSetAvatar = () => {
  const addAvatar = () => {
    const avatars = [
      blueAvatar,
      bluegirlAvatar,
      bluelackAvatar,
      deepgreenAvatar,
      greenAvatar,
      lightgreen1Avatar,
      lightgreen2Avatar,
      orangeAvatar,
      redAvatar,
      redbirdAvatar,
      yellowAvatar,
      yellowbirdAvatar,
    ];

    return avatars[randomize(avatars)];
  };
  const avatar = addAvatar();
  return [avatar];
};

export default useSetAvatar;
