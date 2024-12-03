import { Injectable } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";

@Injectable()
export class PubsubService {
    private pubSub: PubSub
    constructor() {
        this.pubSub = new PubSub()
    }
    async publish(triggerName: string, payload: any) {
        return this.pubSub.publish(triggerName, payload)
    }
    async asyncIterator(triggerName) {
        return this.pubSub.asyncIterator(triggerName)
    }
    getPubSub() {
        return this.pubSub;
    }
}