import type { ChartTypeRegistry } from "chart.js";

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

export type ChartTemplate = {
    type : keyof ChartTypeRegistry,
    title : string,
    labels : string[],
    data : number[],
    color?: string[],
}