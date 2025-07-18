import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const site = api.container.lookup("service:site");
  api.renderInOutlet(
    "composer-after-save-or-cancel",
    <template>
    {{#if @outletArgs.model.privateMessage}}
      <span id="private-message-warning"><a href="https://discourse.mc-stan.org/t/how-private-are-private-messages/18372">
      {{#if site.mobileView}}
      Privacy note
      {{else}}
      How private are personal messages?
      {{/if}}
      </a></span>
    {{/if}}
    </template>
  );
});