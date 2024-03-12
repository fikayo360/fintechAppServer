interface Campaign {
    campaignId: string;
    userId:string,
    title: string,
    image:string,
    description:string,
    goal:number,
    amountRaised:number
    campaignEnds:string
}

export default Campaign