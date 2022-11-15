import type { Project } from './project'
import type { Options } from './config'

export type Pages = 'home' | 'projects' | 'about'

export interface Page {
    projects: Project[]
    options: Options
}

export type Menu = {
    location: 'header' | 'footer'
    items: [string, string][]
}
