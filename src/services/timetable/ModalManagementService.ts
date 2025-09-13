import { SelectedEventDetails } from "../../components/timetable/hooks/useEventModal";

/**
 * Service for managing modal state and interactions
 * Handles modal opening, closing, and state management
 */
export class ModalManagementService {
  private static instance: ModalManagementService;
  private modalStack: string[] = [];
  private modalData: Map<string, SelectedEventDetails> = new Map();

  static getInstance(): ModalManagementService {
    if (!ModalManagementService.instance) {
      ModalManagementService.instance = new ModalManagementService();
    }
    return ModalManagementService.instance;
  }

  /**
   * Opens a modal with event details
   */
  openModal(eventId: string, eventDetails: SelectedEventDetails): void {
    this.modalStack.push(eventId);
    this.modalData.set(eventId, eventDetails);
  }

  /**
   * Closes the current modal
   */
  closeModal(): string | null {
    const closedModal = this.modalStack.pop();
    if (closedModal) {
      this.modalData.delete(closedModal);
      return closedModal;
    }
    return null;
  }

  /**
   * Gets the current modal data
   */
  getCurrentModalData(): SelectedEventDetails | null {
    const currentModalId = this.getCurrentModalId();
    if (!currentModalId) return null;
    return this.modalData.get(currentModalId) || null;
  }

  /**
   * Gets the current modal ID
   */
  getCurrentModalId(): string | null {
    return this.modalStack.length > 0
      ? this.modalStack[this.modalStack.length - 1]
      : null;
  }

  /**
   * Checks if any modal is open
   */
  isModalOpen(): boolean {
    return this.modalStack.length > 0;
  }

  /**
   * Closes all modals
   */
  closeAllModals(): void {
    this.modalStack = [];
    this.modalData.clear();
  }

  /**
   * Gets the modal stack depth
   */
  getModalDepth(): number {
    return this.modalStack.length;
  }

  /**
   * Updates current modal data
   */
  updateCurrentModalData(eventDetails: Partial<SelectedEventDetails>): void {
    const currentModalId = this.getCurrentModalId();
    if (currentModalId) {
      const currentData = this.modalData.get(currentModalId);
      if (currentData) {
        this.modalData.set(currentModalId, { ...currentData, ...eventDetails });
      }
    }
  }

  /**
   * Creates a unique modal ID from event details
   */
  static createModalId(event: string, time: string, area?: string): string {
    return `${area || "unknown"}-${event.replace(/\s+/g, "-")}-${time.replace(":", "-")}`;
  }
}
