import { ExecutionContext, createParamDecorator } from '@nestjs/common'

// Этот кастомный декоратор добывает инфу из Req про session
export const SessionInfo = createParamDecorator(
	(_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().session // session  записали в auth.guard.ts
)
