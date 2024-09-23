<script>
  import { redirect } from '@sveltejs/kit';

export async function load() {
  // Redirect to home ("/") with a 302 status code
  throw redirect(302, '/');
}
</script>