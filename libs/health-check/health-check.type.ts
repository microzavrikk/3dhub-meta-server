export type NodeState = {
    status: boolean;
    name: string;
    startTime: string;
    services: Record<string, boolean>;
  };
  
  export type AppNodesState = {
    upNodes: NodeState[];
    downNodes: NodeState[];
  };
  