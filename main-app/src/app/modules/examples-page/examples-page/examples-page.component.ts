import { Component, OnInit } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";
import {
    MatTreeFlatDataSource,
    MatTreeFlattener,
} from "@angular/material/tree";

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
            {name: "Apple", routerLink: "1"},
            {name: "Banana", routerLink: "2"},
            {name: "Fruit loops"}
        ],
    },
    {
        name: "СМО с отказами",
        children: [
            {
                name: "Green",
                children: [{name: "Broccoli"}, {name: "Brussels sprouts"}],
            },
            {
                name: "Orange",
                children: [{name: "Pumpkins"}, {name: "Carrots"}],
            },
        ],
    },
    {
        name: "СМО с бесконечной очередью"
    }
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
  styleUrls: ["./examples-page.component.less"]
})
export class ExamplesPageComponent implements OnInit {
    public treeControl = new FlatTreeControl<FlatNode>(
        node => node.level,
        node => node.expandable,
    );

    public treeFlattener = new MatTreeFlattener(
        _transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
    );

    public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor() {
        this.dataSource.data = TREE_DATA;
    }

    ngOnInit(): void {
    }

    hasChild = (_: number, node: FlatNode) => node.expandable;

}
