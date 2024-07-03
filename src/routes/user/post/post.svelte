<script lang="ts">
    import type { PostDto } from './post.dto';
    export let datapost: PostDto[];
</script>


{#each datapost as post}
    <div class="card">
        <h1>{post.postId}</h1>
        <p>{post.content}</p>
    </div>
{/each}
