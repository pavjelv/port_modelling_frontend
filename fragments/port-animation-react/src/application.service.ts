import {EventBusService} from "app/models/mfe/event-bus.model";
import {GlobalNavigationService} from "app/models/mfe/global-navigation.model";

export class ApplicationService {
  private static instance: ApplicationService;
  private eventBus: EventBusService;
  private globalNavigationService: GlobalNavigationService;

  public static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService();
    }
    return ApplicationService.instance;
  }

  setGlobalNavigationService(globalNavigationService: GlobalNavigationService | undefined): void {
    if (globalNavigationService) {
      this.globalNavigationService = globalNavigationService;
    }
  }

  getGlobalNavigationService(): GlobalNavigationService {
    return this.globalNavigationService;
  }

  setEventBus(eventBus: EventBusService | undefined): void {
    if (eventBus) {
      this.eventBus = eventBus;
    }
  }

  getEventBus(): EventBusService {
    return this.eventBus;
  }

  getAllNotes(): Array<unknown> {
    let existingNotes: Array<unknown>;
    const existingNotesString: string | null = window.localStorage.getItem("my_notes");
    if (!existingNotesString) {
      existingNotes = [];
    } else {
      existingNotes = JSON.parse(existingNotesString);
    }
    return existingNotes;
  }

  setNotes(notes: Array<unknown>): void {
    return window.localStorage.setItem("my_notes", JSON.stringify(notes));
  }
}
