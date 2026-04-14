import { useState, useEffect } from "react"
import { redirect } from "../helpers/alerts"
import { end_points } from "../services/api"
import { saveLocalStorage } from "../helpers/local-storage"
const Login = () => {
  const [getEmail, setEmail] = useState("")
  const [getPassword, setPassword] = useState("")
  const [getUsers, setUsers] = useState([])

  function fetchUsers() {
    fetch(end_points.users)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    fetchUsers()
  }, [])


  const findUser = () => {
    let user = getUsers.find((item) => getEmail === item.email && getPassword === item.password)
    return user
  }

  function signIn() {
    console.log(findUser())
    if (findUser()) {
      saveLocalStorage("user", findUser())
      redirect(findUser().fullName + " Bienvenido al sistema...", "/dashboard", "success")
    } else {
      redirect("El correo o la contraseña son incorrectos...", "/", "error")
    }
  }

  return (
    <div class="flex h-full grow flex-col">
      <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-6 lg:px-10 py-4 bg-white dark:bg-slate-900">
        <div class="flex items-center gap-3 text-primary">
          <h2 class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">Nexus ATS</h2>
        </div>
        <div class="flex items-center gap-4">
          <a class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Help Center</a>
        </div>
      </header>
      <main class="flex-1 flex items-center justify-center p-6">
        <div class="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 lg:p-10">
          <div class="flex flex-col items-center mb-8">
            <div class="bg-primary/10 p-3 rounded-full mb-4">
              <span class="material-symbols-outlined text-primary text-3xl">login</span>
            </div>
            <h1 class="text-slate-900 dark:text-slate-100 text-2xl font-bold tracking-tight">Welcome Back</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm mt-2 text-center">Manage your applications and profile in one place.</p>
          </div>
          <form class="space-y-5">
            <div class="flex flex-col gap-2">
              <label class="text-slate-700 dark:text-slate-300 text-sm font-medium" for="email">Email Address</label>
              <div class="relative">
                <input onChange={(e) => { setEmail(e.target.value) }} class="w-full px-4 py-3 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" id="email" name="email" placeholder="name@company.com" required="" type="email" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex justify-between items-center">
                <label class="text-slate-700 dark:text-slate-300 text-sm font-medium" for="password">Password</label>
                <a class="text-xs text-primary font-medium hover:underline" href="#">Forgot password?</a>
              </div>
              <div class="relative flex items-center">
                <input onChange={(e) => { setPassword(e.target.value) }} class="w-full px-4 py-3 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500" id="password" name="password" placeholder="Enter your password" required="" type="password" />
                <button class="absolute right-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" type="button">
                  <span class="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input class="w-4 h-4 text-primary border-slate-300 dark:border-slate-700 rounded focus:ring-primary/20" id="remember" type="checkbox" />
              <label class="text-sm text-slate-600 dark:text-slate-400" for="remember">Remember this device</label>
            </div>
            <button onClick={() => { signIn() }} class="w-full bg-primary hover:bg-primary/90 text-dark font-semibold py-3 px-4 border-black rounded flex items-center justify-center gap-2" type="button">
              Sign In
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </form>
          <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?
              <a class="text-primary font-bold hover:underline" href="#">Register now</a>
            </p>
          </div>
        </div>
      </main>
      <footer class="px-10 py-6 text-center text-slate-400 dark:text-slate-600 text-xs">
        <p>© 2024 Nexus Candidate Tracking System. All rights reserved.</p>
        <div class="flex justify-center gap-4 mt-2">
          <a class="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a class="hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}

export default Login