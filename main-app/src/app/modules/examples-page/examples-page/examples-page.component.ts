import { FlatTreeControl } from "@angular/cdk/tree";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { SystemType } from "../../../model/theory/system-type";
import { infQueueDataModelMapper, withQueueDataModelMapper, withRejectDataModelMapper } from "../data/data-model.mapper";

/** Flat node with expandable and level information */
interface FlatNode {
    expandable: boolean;
    name: string;
    level: number;
    routerLink?: string;
}

interface SystemNode {
    name: string;
    routerLink?: string;
    children?: SystemNode[];
}

const TREE_DATA: SystemNode[] = [
    {
        name: "port-modelling-fe.systemType.withQueue",
        children: [...withQueueDataModelMapper.entries()].map(([key, data]) => ({
            name: data.name,
            routerLink: SystemType.WITH_QUEUE + "/" + key,
        })),
    },
    {
        name: "port-modelling-fe.systemType.withReject",
        children: [...withRejectDataModelMapper.entries()].map(([key, data]) => ({
            name: data.name,
            routerLink: SystemType.WITH_REJECT + "/" + key,
        })),
    },
    {
        name: "port-modelling-fe.systemType.infiniteQueue",
        children: [...infQueueDataModelMapper.entries()].map(([key, data]) => ({
            name: data.name,
            routerLink: SystemType.INFINITE_QUEUE + "/" + key,
        })),
    },
];

const _transformer = (node: SystemNode, level: number): FlatNode => {
    return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level,
        routerLink: node.routerLink,
    };
};

@Component({
    selector: "app-examples-page",
    templateUrl: "./examples-page.component.html",
    styleUrls: ["./examples-page.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplesPageComponent {
    public treeControl = new FlatTreeControl<FlatNode>(
        (node) => node.level,
        (node) => node.expandable,
    );

    public treeFlattener = new MatTreeFlattener(
        _transformer,
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children,
    );

    public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor() {
        this.dataSource.data = TREE_DATA;
    }

    hasChild = (_: number, node: FlatNode): boolean => node.expandable;
}
