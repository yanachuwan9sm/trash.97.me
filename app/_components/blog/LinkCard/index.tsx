import { Fragment } from 'react'

export type LinkCardProps = {
  url: string
  title: string
  description: string
  ogImage?: string
  favicon?: string
}

export const LinkCard = ({
  description,
  favicon,
  ogImage,
  title,
  url,
}: LinkCardProps) => (
  <div
    style={{
      border: '2px solid #2f2f2f',
      borderRadius: '8px',
      overflow: 'hidden',
    }}
  >
    <a
      href={url}
      target='_blank'
      rel='noreferrer noopener nofollow'
      style={{
        display: 'flex',
        alignContent: 'center',
        height: '100px',
        color: 'rgb(255 255 255 / 82%)',
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          userSelect: 'none',
        }}
      >
        <span
          style={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: '700',
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: '.75rem' }}>{description}</span>
      </div>
      <div>
        {typeof ogImage !== 'undefined' ? (
          <>
            <div style={{ maxWidth: '230px', height: '100px' }}>
              <img
                style={{
                  objectFit: 'cover',
                  maxWidth: '100%',
                  height: 'auto',
                }}
                src={ogImage}
                alt={description}
              />
            </div>
          </>
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    </a>
  </div>
)
