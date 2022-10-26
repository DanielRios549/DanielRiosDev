import type { Project } from './project'
import type { Options } from './config'

export type Pages = 'home' | 'projects'

export interface Page {
    projects: Project[]
    options: Options
}
