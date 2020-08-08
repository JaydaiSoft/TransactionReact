SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE OR ALTER PROCEDURE [dbo].[spInsertLog]
    (
    @level varchar(max),
    @usersession varchar(max),
    @callSite varchar(max),
    @type varchar(max),
    @message varchar(max),
    @stackTrace varchar(max),
    @innerException varchar(max),
    @additionalInfo varchar(max)
)
as

insert into dbo.application_log
    (
    [Level],
    UserSession,
    CallSite,
    [Type],
    [Message],
    StackTrace,
    InnerException,
    AdditionalInfo,
    LoggedOnDate
    )
values
    (
        @level,
        @usersession,
        @callSite,
        @type,
        @message,
        @stackTrace,
        @innerException,
        @additionalInfo,
        --CURRENT_TIMESTAMP
        DateAdd(hour, 7, CURRENT_TIMESTAMP)
	--TIMESTAMPADD(HOUR, 7, CURRENT_TIMESTAMP)
)




GO


