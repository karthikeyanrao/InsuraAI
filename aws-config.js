import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'YOUR_IDENTITY_POOL_ID', // optional if public access
  }),
});

export default AWS;
