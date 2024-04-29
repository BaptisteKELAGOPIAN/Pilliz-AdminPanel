export type Metrics = {
    date: Date;
    numberOfUsers: number;
    numberOfPosts: number;
    numberOfLikes: number;
    numberOfReposts: number;
    numberOfComments: number;
    numberOfReplies: number;
    weeklyNumberOfUsers: number;
    weeklyNumberOfPosts: number;
    weeklyNumberOfLikes: number;
    weeklyNumberOfReposts: number;
    weeklyNumberOfComments: number;
    weeklyNumberOfReplies: number;
}

export type Chart = {
    labels: string[];
    datasets: {
        label: string;
        fill: boolean;
        lineTension: number;
        backgroundColor: string;
        borderColor: string;
        borderCapStyle: string;
        borderDashOffset: number;
        borderJoinStyle: string;
        pointBorderColor: string;
        pointBackgroundColor: string;
        pointBorderWidth: number;
        pointHoverRadius: number;
        pointHoverBackgroundColor: string;
        pointHoverBorderColor: string;
        pointHoverBorderWidth: number;
        pointRadius: number;
        pointHitRadius: number;
        data: number[];
    }
}