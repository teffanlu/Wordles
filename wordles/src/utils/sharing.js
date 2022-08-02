import React from 'react';
import { Share, View, Button } from 'react-native';

const SocialSharing = async (link) => {
    try {
      const result = await Share.share({
        message: "Hola, El codigo de acceso del rooms es: "+link,
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

export default SocialSharing;