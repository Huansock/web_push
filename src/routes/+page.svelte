<script lang="ts">
  import { PUBLIC_VAPID_KEY } from '$env/static/public';
  async function save_subscription(subscription: PushSubscription) {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });
    return response;
  }
  async function subscribe(){
      const registration = await navigator.serviceWorker.ready;

      let push_subscription = await registration.pushManager.getSubscription();

      if (push_subscription) {
        const response = await save_subscription(push_subscription);
        if (response.ok) {
          alert("Subscription successful!");
        } else {
          alert("Subscription failed: Internal Server Error");
        }
        
      } else { 
        push_subscription = await registration.pushManager.subscribe(
          {
            userVisibleOnly: true,
            applicationServerKey: PUBLIC_VAPID_KEY
          }
        )
        if (push_subscription) {
          const response = await save_subscription(push_subscription);
          if (response.ok) {
            alert("Subscription successful!");
          } else {
            alert("Subscription failed: Internal Server Error");
          }
        }
        else {
          alert("Subscription failed: Internal Server Error");
        }
      }
  }
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button type="button" onclick={subscribe}>Web push Subcription</button>