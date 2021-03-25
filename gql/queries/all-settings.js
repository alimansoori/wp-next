import gql from "graphql-tag";

const ALL_SETTINGS = gql`
query ALL_SETTINGS {
  allSettings {
    discussionSettingsDefaultCommentStatus
    discussionSettingsDefaultPingStatus
    generalSettingsDateFormat
    generalSettingsDescription
    generalSettingsEmail
    generalSettingsLanguage
    generalSettingsTimeFormat
    generalSettingsStartOfWeek
    generalSettingsTimezone
    generalSettingsTitle
    generalSettingsUrl
    readingSettingsPostsPerPage
    writingSettingsDefaultCategory
    writingSettingsDefaultPostFormat
    writingSettingsUseSmilies
  }
}
`;

export default ALL_SETTINGS;
