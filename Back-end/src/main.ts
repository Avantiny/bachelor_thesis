import * as cors from 'cors'
import * as express from 'express'
import models, { sequelize } from './database/core'

const app = express()
const port = 3001

app.use(cors())

app.get('/all-data', async (req, res) => {
  try {
    const tags = await models.Videos.findAll({
      include: [
        {
          model: models.VideosTags,
          include: [
            {
              model: models.Tags,
            },
          ],
        },
      ],
    })
    res.send(tags)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    res.status(500).send(err.message)
  }
})

app.listen(port, () => console.info(`App listening on port ${port}!`))
