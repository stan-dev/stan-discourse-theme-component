import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.renderInOutlet(
    "composer-after-save-or-cancel",
    <template>
    {{#if @outletArgs.model.privateMessage}}
      <span id="private-message-warning"><a href="https://discourse.mc-stan.org/t/how-private-are-private-messages/18372">
      {{#if this.site.mobileView}}
      Privacy note
      {{else}}
      How private are personal messages?
      {{/if}}
      </a></span>
    {{/if}}
    </template>
  );
});