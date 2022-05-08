import {repeatTest} from "../../src/constants/constants";
import {HomepageScenario} from "../../src/scenarios/homepage-scenario";

fixture("port-modelling-frontend").before(async ctx => {
    ctx.url="http://localhost:5000"
}).beforeEach(async t => {
    await t
        .navigateTo(`${ t.fixtureCtx.url }`);
});

repeatTest("Open Homepage", HomepageScenario.openInfoPopover)
