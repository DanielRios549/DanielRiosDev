import { savable } from '$/lib/store'
import type { Project } from '$/types/project'

export const projects = savable<Project[]>('projects', [], true)
