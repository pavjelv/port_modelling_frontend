import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, DetachedRouteHandle } from "@angular/router";

/** Interface for object which can store both:
 * An ActivatedRouteSnapshot, which is useful for determining whether or not you should attach a route (see this.shouldAttach)
 * A DetachedRouteHandle, which is offered up by this.retrieve, in the case that you do want to attach the stored route
 */

export class AppRouteReuseStrategy extends BaseRouteReuseStrategy {
    private storedRoutes = new Map<string, DetachedRouteHandle>();

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return (route?.data as { reusable: boolean })?.reusable;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        this.storedRoutes.set(this.getKey(route), handle);
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return route?.data?.reusable && !!this.storedRoutes.get(this.getKey(route));
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route?.data?.reusable) {
            return null;
        }
        return this.storedRoutes.get(this.getKey(route));
    }

    private getKey(route: ActivatedRouteSnapshot): string {
        return route.pathFromRoot.reduce((aggregator, current) => (aggregator += current.routeConfig?.path + "/"), "/");
    }
}
