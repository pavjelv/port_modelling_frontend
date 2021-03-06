module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "overrides": [
        {
            "files": ["*.ts"],
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "project": "./tsconfig.json",
                "sourceType": "module",
            },
            "plugins": [
                "unicorn",
                "etc",
                "rxjs-angular",
            ],
            "extends": [
                "eslint:recommended",
                "plugin:rxjs/recommended",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:@angular-eslint/recommended",
                "plugin:import/recommended",
                "plugin:prettier/recommended",
            ],
            "rules": {
                // import specific rules
                // https://github.com/import-js/eslint-plugin-import/tree/main/docs/rules
                "import/no-duplicates": "off",
                "import/no-unresolved": "off",
                "import/named": "off",
                "import/namespace": "warn",
                "import/no-named-as-default": "off",
                "import/export": "warn",
                "import/order": ["error",
                    {
                        "groups": ["builtin", "external", "parent", "sibling", "index"],
                        "newlines-between": "ignore",
                        "alphabetize": {
                            "order": "asc",
                            "caseInsensitive": true,
                        },
                    },
                ],

                // angular specific rules
                // https://github.com/angular-eslint/angular-eslint/tree/master/packages/eslint-plugin/docs/rules
                "@angular-eslint/component-class-suffix": "error",
                "@angular-eslint/component-max-inline-declarations": "error",
                // "@angular-eslint/component-selector": [
                //     "error",
                //     { "type": "element", "prefix": ["wf", "ipg", "csrd", "gss"], "style": "kebab-case" },
                // ],
                "@angular-eslint/contextual-decorator": "error",
                "@angular-eslint/contextual-lifecycle": "error",
                "@angular-eslint/directive-class-suffix": "error",
                // "@angular-eslint/directive-selector": [
                //     "error",
                //     { "type": "attribute", "prefix": ["wf", "ipg", "csrd", "gss"], "style": "camelCase" },
                // ],
                "@angular-eslint/no-attribute-decorator": "error",
                "@angular-eslint/no-conflicting-lifecycle": "error",
                "@angular-eslint/no-empty-lifecycle-method": "error",
                "@angular-eslint/no-forward-ref": "error",
                "@angular-eslint/no-host-metadata-property": "error",
                "@angular-eslint/no-input-rename": "error",
                "@angular-eslint/no-lifecycle-call": "error",
                "@angular-eslint/no-output-native": "error",
                "@angular-eslint/no-output-rename": "error",
                "@angular-eslint/no-pipe-impure": "error",
                "@angular-eslint/no-queries-metadata-property": "error",
                "@angular-eslint/prefer-on-push-component-change-detection": "error",
                "@angular-eslint/relative-url-prefix": "error",
                "@angular-eslint/use-component-selector": "error",
                // "@angular-eslint/use-component-view-encapsulation": "warn",
                "@angular-eslint/use-injectable-provided-in": "error",
                "@angular-eslint/use-lifecycle-interface": "error",
                "@angular-eslint/use-pipe-transform-interface": "error",

                // typescript specific rules
                // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
                "@typescript-eslint/array-type": ["error",
                    {
                        "default": "array-simple",
                    },
                ],
                "@typescript-eslint/ban-ts-comment": "warn",
                "@typescript-eslint/ban-types": ["error",
                    {
                        "types": {
                            "MuiSubscription": {
                                "message": "Please use next syntax: fromEvent(eventName).pipe(takeUntil(this.destroy$)).subscribe...",
                            },
                        },
                    },
                ],
                "@typescript-eslint/brace-style": "error",
                "@typescript-eslint/comma-dangle": ["error",
                    {
                        "arrays": "always-multiline",
                        "objects": "only-multiline",
                        "imports": "always-multiline",
                        "exports": "always-multiline",
                        "functions": "always-multiline",
                        "enums": "only-multiline",
                        "generics": "always-multiline",
                        "tuples": "always-multiline",
                    },
                ],
                "@typescript-eslint/comma-spacing": "error",
                // "@typescript-eslint/consistent-type-assertions": ["error",
                //     {
                //         "assertionStyle": "as",
                //         "objectLiteralTypeAssertions": "allow-as-parameter",
                //     }
                // ],
                "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
                "@typescript-eslint/default-param-last": "warn",
                "@typescript-eslint/explicit-function-return-type": "error",
                "@typescript-eslint/func-call-spacing": "error",
                "@typescript-eslint/keyword-spacing": "error",
                "@typescript-eslint/member-delimiter-style": ["error",
                    {
                        "multiline": {
                            "delimiter": "semi",
                            "requireLast": true,
                        },
                        "singleline": {
                            "delimiter": "semi",
                            "requireLast": false,
                        },
                    },
                ],
                "@typescript-eslint/method-signature-style": "error",
                "@typescript-eslint/naming-convention": [
                    "error",
                    {
                        selector: "default",
                        format: ["camelCase"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "variable",
                        format: ["camelCase", "UPPER_CASE"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "property",
                        format: ["camelCase", "UPPER_CASE"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "enumMember",
                        format: ["UPPER_CASE"],
                        leadingUnderscore: "allow",
                        trailingUnderscore: "allow",
                    },
                    {
                        selector: "typeLike",
                        format: ["PascalCase"],
                    },
                ],
                "@typescript-eslint/no-base-to-string": "error",
                "@typescript-eslint/no-confusing-non-null-assertion": "error",
                "@typescript-eslint/no-dupe-class-members": "error",
                "@typescript-eslint/no-duplicate-imports": "error",
                "@typescript-eslint/no-implicit-any-catch": "error",
                "@typescript-eslint/no-invalid-void-type": "error",
                "@typescript-eslint/no-loop-func": "error",
                "@typescript-eslint/no-loss-of-precision": "error",
                "@typescript-eslint/no-require-imports": "error",
                "@typescript-eslint/no-shadow": [
                    "error",
                    {
                        "hoist": "all",
                        "builtinGlobals": false,
                    },
                ],
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
                "@typescript-eslint/no-unnecessary-qualifier": "error",
                "@typescript-eslint/no-unnecessary-type-arguments": "error",
                "@typescript-eslint/no-unnecessary-type-constraint": "error",
                "@typescript-eslint/no-unused-expressions": [
                    "error",
                    {
                        "allowShortCircuit": true,
                        "allowTernary": true,
                    },
                ],
                "@typescript-eslint/no-unused-vars": ["error",
                    {
                        "args": "none",
                    },
                ],
                "@typescript-eslint/no-useless-constructor": "error",
                "@typescript-eslint/non-nullable-type-assertion-style": "error",
                "@typescript-eslint/object-curly-spacing": ["error", "always"],
                "@typescript-eslint/prefer-enum-initializers": "error",
                "@typescript-eslint/prefer-for-of": "error",
                "@typescript-eslint/prefer-function-type": "error",
                "@typescript-eslint/prefer-includes": "error",
                "@typescript-eslint/prefer-literal-enum-member": "error",
                "@typescript-eslint/prefer-nullish-coalescing": "error",
                "@typescript-eslint/prefer-optional-chain": "error",
                "@typescript-eslint/prefer-reduce-type-parameter": "error",
                "@typescript-eslint/prefer-string-starts-ends-with": "error",
                "@typescript-eslint/quotes": [
                    "error",
                    "double",
                    {
                        "allowTemplateLiterals": true,
                    },
                ],
                "@typescript-eslint/require-array-sort-compare": "error",
                "@typescript-eslint/return-await": "error",
                "@typescript-eslint/semi": [
                    "error",
                    "always",
                ],
                "@typescript-eslint/sort-type-union-intersection-members": "error",
                "@typescript-eslint/space-infix-ops": "error",
                "@typescript-eslint/switch-exhaustiveness-check": "error",
                "@typescript-eslint/type-annotation-spacing": "error",
                "@typescript-eslint/typedef": ["error",
                    {
                        "arrowParameter": false,
                        "memberVariableDeclaration": false,
                    },
                ],
                "@typescript-eslint/unified-signatures": "error",

                // unicorn specific rules
                "unicorn/catch-error-name": "error",
                "unicorn/consistent-destructuring": "error",
                "unicorn/empty-brace-spaces": "error",
                "unicorn/error-message": "error",
                "unicorn/escape-case": "error",
                "unicorn/filename-case": "error",
                "unicorn/import-index": "error",
                "unicorn/import-style": "error",
                "unicorn/new-for-builtins": "error",
                "unicorn/no-array-callback-reference": "error",
                "unicorn/no-array-push-push": "error",
                "unicorn/no-instanceof-array": "error",
                "unicorn/no-lonely-if": "error",
                "unicorn/no-new-array": "error",
                "unicorn/no-new-buffer": "error",
                "unicorn/no-object-as-default-parameter": "error",
                "unicorn/no-static-only-class": "error",
                "unicorn/no-unreadable-array-destructuring": "error",
                "unicorn/no-useless-undefined": "error",
                "unicorn/prefer-add-event-listener": "error",
                "unicorn/prefer-array-find": "error",
                "unicorn/prefer-array-flat": "error",
                "unicorn/prefer-array-flat-map": "error",
                "unicorn/prefer-array-index-of": "error",
                "unicorn/prefer-date-now": "error",
                "unicorn/prefer-includes": "error",
                "unicorn/prefer-keyboard-event-key": "error",
                "unicorn/prefer-math-trunc": "error",
                "unicorn/prefer-optional-catch-binding": "error",
                "unicorn/prefer-reflect-apply": "error",
                "unicorn/prefer-set-has": "error",
                "unicorn/prefer-spread": "error",
                "unicorn/prefer-string-replace-all": "error",
                "unicorn/prefer-string-slice": "error",
                "unicorn/prefer-string-starts-ends-with": "error",
                "unicorn/prefer-string-trim-start-end": "error",
                "unicorn/prefer-ternary": "error",
                "unicorn/prefer-type-error": "error",
                "unicorn/throw-new-error": "error",

                // eslint native rules
                // Possible Problems
                "array-callback-return": "error",
                "getter-return": "error",
                "no-const-assign": "error",
                "no-constructor-return": "error",
                "no-dupe-args": "error",
                "no-dupe-keys": "error",
                "no-func-assign": "error",
                "no-import-assign": "error",
                "no-inner-declarations": ["error", "both"],
                "no-new-symbol": "error",
                "no-obj-calls": "error",
                "no-promise-executor-return": "error",
                "no-self-compare": "error",
                "no-setter-return": "error",
                "no-template-curly-in-string": "error",
                "no-this-before-super": "error",
                "no-undef": "warn",
                "no-unreachable": "error",
                "no-unreachable-loop": "error",
                "no-unsafe-negation": "error",
                "no-unsafe-optional-chaining": "error",
                "no-useless-backreference": "error",
                "require-atomic-updates": "error",
                "valid-typeof": "error",
                // Suggestions
                "consistent-return": "error",
                "curly": "error",
                "default-case": "error",
                "default-case-last": "error",
                "eqeqeq": ["error", "smart"],
                "grouped-accessor-pairs": "error",
                "guard-for-in": "error",
                "no-bitwise": "error",
                "no-caller": "error",
                "no-confusing-arrow": "error",
                "no-console": ["warn",
                    {
                        "allow": [
                            "warn",
                            "dir",
                            "timeLog",
                            "assert",
                            "clear",
                            "count",
                            "countReset",
                            "group",
                            "groupEnd",
                            "table",
                            "dirxml",
                            "error",
                            "groupCollapsed",
                            "Console",
                            "profile",
                            "profileEnd",
                            "timeStamp",
                            "context",
                        ],
                    },
                ],
                "no-else-return": ["error",
                    {
                        "allowElseIf": false,
                    },
                ],
                "no-empty": ["error",
                    {
                        "allowEmptyCatch": false,
                    },
                ],
                "no-eval": "error",
                "no-extend-native": "error",
                "no-extra-bind": "error",
                "no-iterator": "error",
                "no-labels": "error",
                "no-mixed-operators": "warn",
                "no-new": "error",
                "no-new-func": "error",
                "no-new-object": "error",
                "no-new-wrappers": "error",
                "no-nonoctal-decimal-escape": "error",
                "no-param-reassign": "warn",
                "no-proto": "error",
                "no-redeclare": "error",
                "no-restricted-globals": ["error", "event", "name", "length"],
                "no-return-assign": "error",
                "no-undef-init": "error",
                "no-useless-call": "error",
                "no-useless-computed-key": ["error",
                    {
                        "enforceForClassMembers": true,
                    },
                ],
                "no-useless-concat": "error",
                "no-useless-rename": "error",
                "object-shorthand": "error",
                "one-var": ["error", "never"],
                "prefer-arrow-callback": "error",
                "radix": "error",
                "sort-imports": ["error", {
                    "ignoreCase": true,
                    "ignoreDeclarationSort": true,
                    "ignoreMemberSort": false,
                    "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
                    "allowSeparatedGroups": false,
                }],
                "spaced-comment": "error",
                "symbol-description": "error",
                "yoda": "error",
                // Layout & Formatting
                "array-bracket-spacing": ["error", "never"],
                "arrow-parens": "error",
                "arrow-spacing": "error",
                "eol-last": "error",
                "generator-star-spacing": "error",
                "max-len": ["error",
                    {
                        "code": 200,
                    },
                ],
                "no-mixed-spaces-and-tabs": "error",
                "no-tabs": "error",
                "no-trailing-spaces": "error",
                "yield-star-spacing": "error",

                // eslint-etc specific rules
                // https://github.com/cartant/eslint-plugin-etc/tree/main/docs/rules
                "etc/no-assign-mutated-array": "error",
                "etc/no-deprecated": "warn",

                // eslint-rxjs-angular specific rules
                "rxjs-angular/prefer-takeuntil": ["error",
                    {
                        "checkDestroy": false,
                    },
                ],

                // eslint-rxjs specific rules
                "rxjs/no-connectable": "error",
                "rxjs/no-cyclic-action": "error",
                "rxjs/no-exposed-subjects": "error",
                "rxjs/no-ignored-subscribe": "warn",
                "rxjs/no-subclass": "error",
                "rxjs/no-unsafe-catch": "error",
                "rxjs/no-unsafe-first": "error",
                "rxjs/no-unsafe-switchmap": ["error",
                    {
                        "disallow": [
                            "add",
                            "create",
                            "delete",
                            "post",
                            "put",
                            "remove",
                            "set",
                            "update",
                        ],
                        "observable": "action(s|\\$)?",
                    },
                ],
                "rxjs/no-unsafe-takeuntil": ["error",
                    {
                        "allow":
                            [
                                "count",
                                "defaultIfEmpty",
                                "endWith",
                                "every",
                                "finalize",
                                "finally",
                                "isEmpty",
                                "last",
                                "max",
                                "min",
                                "publish",
                                "publishBehavior",
                                "publishLast",
                                "publishReplay",
                                "reduce",
                                "share",
                                "shareReplay",
                                "skipLast",
                                "takeLast",
                                "throwIfEmpty",
                                "toArray",
                            ],
                    },
                ],
                "rxjs/prefer-observer": "error",
                "rxjs/throw-error": "error",

                // bad recommended rules
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-floating-promises": "off",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/restrict-plus-operands": "off",
                "@typescript-eslint/restrict-template-expressions": "off",
                "@typescript-eslint/unbound-method": "off",
                "no-useless-escape": "off",
                "ngrx/no-typed-store": "off",
                "ngrx/no-multiple-actions-in-effects": "off",
                "rxjs/no-implicit-any-catch": "off",
            },
        },
        {
            "files": ["*.html"],
            "parser": "@angular-eslint/template-parser",
            "plugins": ["@angular-eslint/template"],
            "rules": {
                // https://github.com/angular-eslint/angular-eslint/tree/master/packages/eslint-plugin-template/docs/rules
                "@angular-eslint/template/accessibility-elements-content": "warn",
                "@angular-eslint/template/no-autofocus": "warn",
                "@angular-eslint/template/no-distracting-elements": "error",
                "@angular-eslint/template/no-positive-tabindex": "error",
                // instead of 'let i of [].constructor(N)' use 'let i of N | numericalFor'
                // "@angular-eslint/template/no-call-expression": "warn",
                "@angular-eslint/template/no-negated-async": "error",
                "@angular-eslint/template/banana-in-box": "error",
                "@angular-eslint/template/no-any": "error",
                "@angular-eslint/template/conditional-complexity": "error",
                "@angular-eslint/template/no-duplicate-attributes": "error",
            },
        },
        {
            "files": ["*.html"],
            "excludedFiles": ["*inline-template-*.component.html"],
            "extends": ["plugin:prettier/recommended"],
            "rules": {
                "prettier/prettier": ["error",
                    {
                        "parser": "angular",
                    },
                ],
            },
        },
    ],
};
