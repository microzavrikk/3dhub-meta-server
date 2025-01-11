import { ClientProxy } from "@nestjs/microservices";
import { NodeState, AppNodesState } from "./health-check.type";
import { HealthIndicator } from "./health-indicator.base";

export class HealthCheck {
    private microservices: string[] = [
        'users',
        'storage',
    ].sort();
    private startTime: string;

    constructor(
        private readonly client: ClientProxy,
        private readonly healthIndicators: { [n in string]: HealthIndicator }
    ) {
        this.startTime = new Date().toJSON();
    }

    async checkAllNodes(): Promise<AppNodesState> {
        const upNodes: NodeState[] = [];
        const downNodes: NodeState[] = [];

        for(const serviceName of this.microservices) {
            try {
                const nodeState: NodeState = await this.client.send({ cmd: `${serviceName}.ping` as any }, {}).toPromise();
                if(nodeState.status) {
                    upNodes.push({
                        name: serviceName, 
                        status: nodeState.status,
                        startTime: nodeState.startTime,
                        services: nodeState.services
                    });
                }
                else {
                    downNodes.push(nodeState);
                }
            }
            catch(error) {
                downNodes.push({
                    name: serviceName,
                    status: false,
                    startTime: this.startTime,
                    services: {},
                });
            }
        }

        return { upNodes, downNodes };
    }

    async checkCurrentNode(serviceName: string): Promise<NodeState> {
        const currentNode: NodeState = {
            name: serviceName,
            status: false,
            startTime: this.startTime,
            services: {}
        };
    
    
        for (const [name, healthIndicator] of Object.entries(this.healthIndicators)) {
            try {
                const state = await healthIndicator.isHealthy(name);
                for (const indicatorName in state) {
                    const indicator = state[indicatorName];
                    currentNode.services[indicatorName] = indicator.status === 'up';
                }
            } catch (error) {
                currentNode.services[name] = false;
            }
        }
    
        currentNode.status = Object.values(currentNode.services).every((v) => v);
        return currentNode;
    }
}