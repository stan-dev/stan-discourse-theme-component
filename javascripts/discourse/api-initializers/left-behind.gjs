import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.renderInOutlet(
    "before-topic-list",
    <template>
      <div id="left-behind-msg">
      </div>
    </template>
  );
});