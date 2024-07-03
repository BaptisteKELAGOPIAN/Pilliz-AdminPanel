enum UserRoles {
    admin,
    user
}
  
enum BanningStatus {
    banned,
    notBanned
}
  

export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
    role: UserRoles;
    banned: BanningStatus;
    createdAt: Date;
    updatedAt: Date;
    firstConnection: boolean;
    tutorialFeed: boolean;
    tutorialMarketplace: boolean;
    tutorialPro: boolean;
    bio: string;
    isConnected: boolean;
    isVerified: boolean;
    profilPicture: string;
    // Métriques
    country: string;
    totalAppTime: number;
    totalFeedTime: number;
    totalMarketTime: number;
    totalProTime: number;
    deviceRelease: string;
    deviceVersion: string;
    deviceName: string;
    deviceWidth: number;
    deviceHeight: number;
    codeVerification: number;
  };
  