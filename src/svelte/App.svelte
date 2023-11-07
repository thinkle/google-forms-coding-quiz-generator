<script lang="ts">
  import Counter from "./lib/Counter.svelte";
  import { Block, Icon, work } from "google-apps-script-svelte-components";
  import { parseContext } from "./lib/parseContext";
  import { GoogleAppsScript } from "./gasApi";
  import { onMount } from "svelte";
  let email;
  let contextString = `<? context ?>`;
  let context = parseContext(contextString);
  onMount(async () => {
    email = await GoogleAppsScript.getActiveUserEmail();
  });
</script>

<main>
  <h1>Coding Quiz Fun Time!</h1>
  <Block>
    <p>Cat Image</p>
    <img
      alt="cat"
      src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg"
    />
  </Block>
  <div>
    <span class="gray">
      Created with
      <a
        target="_blank"
        href="https://github.com/thinkle/Google-Apps-Script-Svelte-Starter"
      >
        Google Apps Script + Svelte Starter Kit
      </a>
      by
      <a target="_blank" href="https://www.tomhinkle.net"> Tom Hinkle </a>
    </span>
  </div>
</main>

<style>
  img {
    max-width: 90%;
  }
</style>
