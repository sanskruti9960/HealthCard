// Utilfit.js or fitHelper.js
import GoogleFit from 'react-native-google-fit';

export const initGoogleFit = async () => {
  return new Promise((resolve, reject) => {
    GoogleFit.checkIsAuthorized().then(() => {
      if (GoogleFit.isAuthorized) {
        resolve();  // Already authorized, no popup
      } else {
        const options = {
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_LOCATION_READ,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
          ],
        };

        GoogleFit.authorize(options)
          .then(authResult => {
            if (authResult.success) {
              resolve();
            } else {
              reject(new Error('Google Fit authorization failed.'));
            }
          })
          .catch(err => reject(err));
      }
    });
  });
};
