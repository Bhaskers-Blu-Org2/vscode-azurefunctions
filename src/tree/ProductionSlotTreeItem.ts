/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ISiteTreeRoot, SiteClient } from 'vscode-azureappservice';
import { AzureTreeItem } from 'vscode-azureextensionui';
import { getWorkspaceSetting } from '../vsCodeConfig/settings';
import { SlotsTreeItem } from './SlotsTreeItem';
import { SlotTreeItem } from './SlotTreeItem';
import { SlotTreeItemBase } from './SlotTreeItemBase';
import { SubscriptionTreeItem } from './SubscriptionTreeItem';

export class ProductionSlotTreeItem extends SlotTreeItemBase {
    public static contextValue: string = 'azFuncProductionSlot';
    public readonly contextValue: string = ProductionSlotTreeItem.contextValue;

    private readonly _slotsTreeItem: SlotsTreeItem;

    public constructor(parent: SubscriptionTreeItem, client: SiteClient) {
        super(parent, client);
        this._slotsTreeItem = new SlotsTreeItem(this);
    }

    public get label(): string {
        return this.root.client.fullName;
    }

    public async loadMoreChildrenImpl(): Promise<AzureTreeItem<ISiteTreeRoot>[]> {
        const children: AzureTreeItem<ISiteTreeRoot>[] = await super.loadMoreChildrenImpl();
        if (getWorkspaceSetting('enableSlots')) {
            children.push(this._slotsTreeItem);
        }
        return children;
    }

    public pickTreeItemImpl(expectedContextValues: (string | RegExp)[]): AzureTreeItem<ISiteTreeRoot> | undefined {
        for (const expectedContextValue of expectedContextValues) {
            switch (expectedContextValue) {
                case SlotsTreeItem.contextValue:
                case SlotTreeItem.contextValue:
                    return this._slotsTreeItem;
                default:
            }
        }

        return super.pickTreeItemImpl(expectedContextValues);
    }
}
