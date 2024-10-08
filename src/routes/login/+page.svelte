<script>
    import Logo from '../../media/img/logo.png';
    import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
    import Fa from 'svelte-fa'
</script>

<div class ="flex w-full h-full items-center justify-center">
    <div class ="card p-16">
        <div class="flex w-full h-full items-center justify-center mb-6">
            <img src={Logo} alt="Skeleton Logo" class="h-20"/>
        </div>
        <div class="flex w-full h-full items-center justify-center mb-3">
            <Fa size="3x" icon={faLock}/>
        </div>
        <form method="POST" class="flex flex-col items-center">
            <label class="label mb-6">
                <span>Identifiant</span>
                <input class="input" name="userid" type="text" placeholder="ton id" />
            </label>
            <label class="label mb-6 w-full">
                <span>Email</span>
                <input class="input" name="email" type="email" placeholder="your@email" />
            </label>
            <label class="label mb-6">
                <span>Password</span>
                <input class="input" name="password" type="password" placeholder="password" />
            </label>
            <button type="submit" class="btn variant-filled w-36">
                <span><Fa size="1x" icon={faUnlock}/></span>
                <span>Connexion</span>
            </button>
        </form>
    </div>
</div>