import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, select } from "@storybook/addon-knobs/angular";

import { InformationFilledModule } from "@carbon/icons-angular";
import { DialogModule } from "../dialog.module";
import { PlaceholderModule } from "../../placeholder/index";
import { DocumentationModule } from "../../documentation-component/documentation.module";
import { boolean, object } from "@storybook/addon-knobs";

storiesOf("Components|Tooltip", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				DialogModule,
				PlaceholderModule,
				InformationFilledModule,
				DocumentationModule
			]
		})
	)
	.addDecorator(withKnobs)
	.add("Basic", () => ({
		template: `
			<div>
				<ng-template #template let-tooltip="tooltip">
					<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
						If more room is needed please use a modal instead.</p>
					<div class="bx--tooltip__footer">
						<a href="/" class="bx--link">Learn More</a>
						<button class="bx--btn bx--btn--primary" (click)="tooltip.doClose()">Close</button>
					</div>
				</ng-template>

				<div class="bx--tooltip__label">
					{{triggerText}}
					<span
						[ibmTooltip]="template"
						[offset]="offset"
						trigger="click"
						[placement]="placement">
						<div role="button">
							<ibm-icon-information-filled size="16"></ibm-icon-information-filled>
						</div>
					</span>
				</div>
				<ibm-placeholder></ibm-placeholder>
			</div>
		`,
		props: {
			placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
			triggerText: text("Trigger text", "Tooltip label"),
			offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
		}
	}))
	.add("No icon", () => ({
		template: `
				<div>
					<ng-template #template let-tooltip="tooltip">
						<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
							If more room is needed please use a modal instead.</p>
						<div class="bx--tooltip__footer">
							<a href="/" class="bx--link">Learn More</a>
							<button class="bx--btn bx--btn--primary" (click)="tooltip.doClose()">Close</button>
						</div>
					</ng-template>

					<span
						[ibmTooltip]="template"
						[offset]="offset"
						trigger="click"
						[placement]="placement">
						{{triggerText}}
					</span>
					<ibm-placeholder></ibm-placeholder>
				</div>
			`,
			props: {
				placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
				triggerText: text("Trigger text", "Tooltip label"),
				offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
			}
	}))
	.add("Only icon", () => ({
		template: `
				<div>
					<ng-template #template let-tooltip="tooltip">
						<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
							If more room is needed please use a modal instead.</p>
						<div class="bx--tooltip__footer">
							<a href="/" class="bx--link">Learn More</a>
							<button class="bx--btn bx--btn--primary" (click)="tooltip.doClose()">Close</button>
						</div>
					</ng-template>

					<span
						[ibmTooltip]="template"
						[offset]="offset"
						trigger="click"
						[placement]="placement">
						<div role="button" class="bx--tooltip__trigger">
							<svg focusable="false" aria-label="tooltip" width="16" height="16" viewBox="0 0 16 16" role="img" style="will-change: transform;">
								<circle cx="8" cy="3" r="1"></circle><circle cx="8" cy="8" r="1"></circle><circle cx="8" cy="13" r="1"></circle>
							</svg>
						</div>
					</span>
					<ibm-placeholder></ibm-placeholder>
				</div>
			`,
			props: {
				placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
				// get displacement(): number { return this.placement === "left" ? -10 : 0; },
				// displacement: -10,
				// offset: object("Horizontal and vertical offset", { x: 0, y: this.placement}),
				get offset(): string {
					// console.log("placement is ", this.placement);
					// const notLeft = { x: 0, y: 0};
					// const left = { x: 0, y: -10 };
					// const text = "Horizontal and vertical offset";
					const result = this.placement === "left" ? console.log("it's left") : console.log("it's not left");
					return `${text}${result}`; }
				// offset: object("Horizontal and vertical offset", { x: 0, y: 0}),
				// get hello(): string { return this.placement; }
				// hello: this.placement
			}
	}))
	.add("Multiple tooltips", () => ({
		template: `
			<div style="display: flex">
				<div style="margin-right:30px">
					<ng-template #template let-tooltip="tooltip">
						<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
							If more room is needed please use a modal instead.</p>
						<div class="bx--tooltip__footer">
						</div>
					</ng-template>
					<span
						[ibmTooltip]="template"
						[offset]="offset"
						trigger="hover"
						[placement]="placement">
						{{triggerText}}
					</span>
					<ibm-placeholder></ibm-placeholder>
				</div>
				<div>
					<ng-template #template2 let-tooltip="tooltip">
						<p>This is some tooltip text. This box shows the maximum amount of text that should appear inside.
							If more room is needed please use a modal instead.</p>
						<div class="bx--tooltip__footer">
						</div>
					</ng-template>
					<span
						[ibmTooltip]="template2"
						trigger="hover"
						[placement]="placement">
						{{triggerText}}
					</span>
					<ibm-placeholder></ibm-placeholder>
				</div>
			</div>
			`,
			props: {
				placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
				triggerText: text("Trigger text", "Tooltip label"),
				offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
			}
	}))
	.add("Programmatically", () => ({
		template: `
			<div>
				<div class="bx--tooltip__label">
					{{triggerText}}
					<span
						ibmTooltip="Hello, World"
						[offset]="offset"
						[isOpen]="isOpen"
						trigger="click"
						[placement]="placement">
						<div role="button">
							<ibm-icon-information-filled size="16"></ibm-icon-information-filled>
						</div>
					</span>
				</div>
				<ibm-placeholder></ibm-placeholder>
			</div>
		`,
		props: {
			placement: select("Tooltip direction", ["bottom", "top", "left", "right"], "bottom"),
			triggerText: text("Trigger text", "Tooltip label"),
			isOpen: boolean("isOpen", false),
			offset: object("Horizontal and vertical offset", { x: 0, y: 0 })
		}
	}))
	.add("Ellipsis tooltip", () => ({
		styles: [`
			.fullText {
				white-space: nowrap;
				display: inline-block;
			}
			.overflowText {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width: 100px;
				display: inline-block;
			}
		`],
		template: `
			<span
				class="ellipsis"
				[ngClass]="{
					'fullText': showFullText,
					'overflowText': !showFullText
				}"
				trigger="hover"
				[placement]="'bottom'"
				ibmEllipsisTooltip>
					Tooltip for ellipsis because I can and I am really really long
			</span>
			<ibm-placeholder></ibm-placeholder>
		`,
		props: {
			showFullText: boolean("Show full text", false)
		}
	}))
	.add("Documentation", () => ({
		template: `
			<ibm-documentation src="documentation/directives/TooltipDirective.html"></ibm-documentation>
		`
	}));
