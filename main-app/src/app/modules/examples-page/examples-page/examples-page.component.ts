import { FlatTreeControl } from "@angular/cdk/tree";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";

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
        name: "СМО с ограниченной очередью",
        children: [
            { name: "1", routerLink: "1" },
            { name: "2", routerLink: "2" },
        ],
    },
    {
        name: "СМО с отказами",
        children: [
            {
                name: "Green",
            },
            {
                name: "Orange",
            },
        ],
    },
    {
        name: "СМО с бесконечной очередью",
        children: [
            { name: "1", routerLink: "1" },
            { name: "2", routerLink: "2" },
        ],
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
