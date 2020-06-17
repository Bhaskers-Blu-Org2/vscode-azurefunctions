/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Pulling the latest stacks from here: https://github.com/pragnagopa/azure-functions-supported-runtime-stacks
 * Those stacks haven't rolled out to the "availableStacks" API yet. Once they do, we can switch to using that API instead of hard-coding here.
 * For example, the "availableStacks" API doesn't have the "supportedFunctionsExtensionVersions" property yet
 */

export interface IFunctionStack {
    name: string;
    display: string;
    majorVersions: IFunctionStackMajorVersion[];
}

export interface IFunctionStackMajorVersion {
    displayVersion: string;
    supportedFunctionsExtensionVersions: string[];
    runtimeVersion: string | undefined;
    appSettingsDictionary: { [key: string]: string };
    siteConfigPropertiesDictionary: {};
}

export function getLinuxFunctionsStacks(): IFunctionStack[] {
    return filterFunctionStacks(getFunctionStacks(linuxFunctionsStacks));
}

export function getWindowsFunctionsStacks(): IFunctionStack[] {
    return filterFunctionStacks(getFunctionStacks(windowsFunctionsStacks));
}

function filterFunctionStacks(stacks: IFunctionStack[]): IFunctionStack[] {
    for (const stack of stacks) {
        // Not quite ready to display these new stacks - need to do more verification that it actually works end-to-end from our extension
        // Java 11: https://github.com/microsoft/vscode-azurefunctions/issues/2033
        // PowerShell 7: https://github.com/microsoft/vscode-azurefunctions/issues/1866
        stack.majorVersions = stack.majorVersions.filter(mv => {
            return !((/powershell/i.test(stack.name) && /7/.test(mv.displayVersion)) || (/java/i.test(stack.name) && /11/.test(mv.displayVersion)));
        });
    }
    return stacks;
}

/**
 * I constructed v1 stacks myself because they're not accurate in the above mentioned repo
 * https://github.com/pragnagopa/azure-functions-supported-runtime-stacks/issues/5
 */
export function getV1Stacks(): IFunctionStack[] {
    return [
        {
            name: 'dotnet',
            display: '.NET Framework',
            majorVersions: [
                {
                    displayVersion: '4.7',
                    supportedFunctionsExtensionVersions: ['~1'],
                    runtimeVersion: 'dotnet',
                    appSettingsDictionary: {},
                    siteConfigPropertiesDictionary: {}
                }
            ]
        },
        {
            name: 'node',
            display: 'Node.js',
            majorVersions: [
                {
                    displayVersion: '6',
                    supportedFunctionsExtensionVersions: ['~1'],
                    runtimeVersion: 'node',
                    appSettingsDictionary: {},
                    siteConfigPropertiesDictionary: {}
                }
            ]
        }
    ];
}

function getFunctionStacks(data: string): IFunctionStack[] {
    return (<{ value: { properties: IFunctionStack }[] }>JSON.parse(data)).value.map(v => v.properties);
}

const linuxFunctionsStacks: string = `{
    "value": [
        {
            "id": null,
            "name": "dotnet",
            "type": "Microsoft.Web/availableStacks?osTypeSelected=LinuxFunctions",
            "properties": {
                "name": "dotnet",
                "display": ".NET Core",
                "dependency": null,
                "majorVersions": [
                    {
                        "displayVersion": "3.1",
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "runtimeVersion": "dotnet|3.1",
                        "isDefault": false,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "dotnet",
                            "linuxFxVersion": "dotnet|3.1"
                        },
                        "siteConfigPropertiesDictionary": {
                            "Use32BitWorkerProcess": false
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    }
                ],
                "frameworks": [],
                "isDeprecated": null
            }
        },
        {
            "id": null,
            "name": "node",
            "type": "Microsoft.Web/availableStacks?osTypeSelected=LinuxFunctions",
            "properties": {
                "name": "node",
                "display": "Node.js",
                "dependency": null,
                "majorVersions": [
                    {
                        "displayVersion": "12",
                        "runtimeVersion": "Node|12",
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "node"
                        },
                        "siteConfigPropertiesDictionary": {
                            "Use32BitWorkerProcess": false,
                            "linuxFxVersion": "Node|12"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    },
                    {
                        "displayVersion": "10",
                        "runtimeVersion": "Node|10",
                        "supportedFunctionsExtensionVersions": [
                            "~2",
                            "~3"
                        ],
                        "isDefault": false,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "node"
                        },
                        "siteConfigPropertiesDictionary": {
                            "Use32BitWorkerProcess": false,
                            "linuxFxVersion": "Node|10"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    }
                ],
                "frameworks": [],
                "isDeprecated": null
            }
        },
        {
            "id": null,
            "name": "python",
            "type": "Microsoft.Web/availableStacks?osTypeSelected=LinuxFunctions",
            "properties": {
                "name": "python",
                "display": "Python",
                "dependency": null,
                "majorVersions": [
                    {
                        "displayVersion": "3.6",
                        "runtimeVersion": "Python|3.6",
                        "supportedFunctionsExtensionVersions": [
                            "~2",
                            "~3"
                        ],
                        "isDefault": false,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "python"
                        },
                        "siteConfigPropertiesDictionary": {
                            "Use32BitWorkerProcess": false,
                            "linuxFxVersion": "Python|3.6"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    },
                    {
                        "displayVersion": "3.7",
                        "runtimeVersion": "Python|3.7",
                        "supportedFunctionsExtensionVersions": [
                            "~2",
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "python"
                        },
                        "siteConfigPropertiesDictionary": {
                            "Use32BitWorkerProcess": false,
                            "linuxFxVersion": "Python|3.7"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    },
                    {
                        "displayVersion": "3.8",
                        "runtimeVersion": "Python|3.8",
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "isDefault": false,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "python"
                        },
                        "siteConfigPropertiesDictionary": {
                            "Use32BitWorkerProcess": false,
                            "linuxFxVersion": "Python|3.8"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    }
                ],
                "frameworks": [],
                "isDeprecated": null
            }
        },
        {
            "id": null,
            "name": "java",
            "type": "Microsoft.Web/availableStacks?osTypeSelected=LinuxFunctions",
            "properties": {
                "name": "java",
                "display": "Java",
                "dependency": null,
                "majorVersions": [
                    {
                        "displayVersion": "8",
                        "runtimeVersion": "Java|8",
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "java"
                        },
                        "siteConfigPropertiesDictionary": {
                            "Use32BitWorkerProcess": false,
                            "linuxFxVersion": "Java|8"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    },
                    {
                        "displayVersion": "11",
                        "runtimeVersion": "Java|11",
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "java"
                        },
                        "siteConfigPropertiesDictionary": {
                            "Use32BitWorkerProcess": false,
                            "linuxFxVersion": "Java|11"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    }
                ],
                "frameworks": [],
                "isDeprecated": null
            }
        }
    ],
    "nextLink": null,
    "id": null
}`;

const windowsFunctionsStacks: string = `{
    "value": [
        {
            "id": null,
            "name": "dotnet",
            "type": "Microsoft.Web/availableStacks?osTypeSelected=WindowsFunctions",
            "properties": {
                "name": "dotnet",
                "display": ".NET Core",
                "dependency": null,
                "majorVersions": [
                    {
                        "displayVersion": "3.1",
                        "runtimeVersion": null,
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "dotnet"
                        },
                        "siteConfigPropertiesDictionary": {},
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    }
                ],
                "frameworks": [],
                "isDeprecated": null
            }
        },
        {
            "id": null,
            "name": "node",
            "type": "Microsoft.Web/availableStacks?osTypeSelected=WindowsFunctions",
            "properties": {
                "name": "node",
                "display": "Node.js",
                "dependency": null,
                "majorVersions": [
                    {
                        "displayVersion": "12",
                        "runtimeVersion": "~12",
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "node",
                            "WEBSITE_NODE_DEFAULT_VERSION": "~12"
                        },
                        "siteConfigPropertiesDictionary": {},
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    },
                    {
                        "displayVersion": "10",
                        "runtimeVersion": "~10",
                        "supportedFunctionsExtensionVersions": [
                            "~2",
                            "~3"
                        ],
                        "isDefault": false,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "node",
                            "WEBSITE_NODE_DEFAULT_VERSION": "~10"
                        },
                        "siteConfigPropertiesDictionary": {},
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    },
                    {
                        "displayVersion": "8",
                        "runtimeVersion": "~8",
                        "supportedFunctionsExtensionVersions": [
                            "~1",
                            "~2"
                        ],
                        "isDefault": false,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "node",
                            "WEBSITE_NODE_DEFAULT_VERSION": "~8"
                        },
                        "siteConfigPropertiesDictionary": {},
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    }
                ],
                "frameworks": [],
                "isDeprecated": null
            }
        },
        {
            "id": null,
            "name": "java",
            "type": "Microsoft.Web/availableStacks?osTypeSelected=WindowsFunctions",
            "properties": {
                "name": "java",
                "display": "Java",
                "dependency": null,
                "majorVersions": [
                    {
                        "displayVersion": "8",
                        "runtimeVersion": "1.8",
                        "supportedFunctionsExtensionVersions": [
                            "~2",
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "java"
                        },
                        "siteConfigPropertiesDictionary": {},
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    },
                    {
                        "displayVersion": "11",
                        "runtimeVersion": "11",
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "java"
                        },
                        "siteConfigPropertiesDictionary": {},
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    }
                ],
                "frameworks": [],
                "isDeprecated": null
            }
        },
        {
            "id": null,
            "name": "powershell",
            "type": "Microsoft.Web/availableStacks?osTypeSelected=WindowsFunctions",
            "properties": {
                "name": "powershell",
                "display": "PowerShell Core",
                "dependency": null,
                "majorVersions": [
                    {
                        "displayVersion": "6.2",
                        "runtimeVersion": "~6",
                        "supportedFunctionsExtensionVersions": [
                            "~2",
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "powershell"
                        },
                        "siteConfigPropertiesDictionary": {
                            "PowerShellVersion": "~6"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    },
                    {
                        "displayVersion": "7.0",
                        "runtimeVersion": "~7",
                        "supportedFunctionsExtensionVersions": [
                            "~3"
                        ],
                        "isDefault": true,
                        "minorVersions": [],
                        "applicationInsights": true,
                        "appSettingsDictionary": {
                            "FUNCTIONS_WORKER_RUNTIME": "powershell"
                        },
                        "siteConfigPropertiesDictionary": {
                            "PowerShellVersion": "~7"
                        },
                        "isPreview": false,
                        "isDeprecated": false,
                        "isHidden": false
                    }
                ],
                "frameworks": [],
                "isDeprecated": null
            }
        }
    ],
    "nextLink": null,
    "id": null
}`;
