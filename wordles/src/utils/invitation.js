import React from 'react';
import { Share, View, Button } from 'react-native';

const Invitation = async () => {
    try {
      const result = await Share.share({
        message:
          'Hola! Juega con wordles y encuentra las palabras! Descarga la app ya!!! https://github.com/teffanlu/Wordles',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
};

export default Invitation;