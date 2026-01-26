export default async function Page(props: {
  params: Promise<{ genre: string }>;
}) {
  const params = await props.params;
  return (
    <div>
      My Post: {params.genre}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum corporis
      distinctio facilis fugit totam dolore ad esse, aliquid, reiciendis
      praesentium architecto cum nulla quaerat repudiandae mollitia. Nulla, fuga
      totam, alias incidunt expedita quibusdam laudantium error quod maiores
      mollitia quisquam. Blanditiis, aspernatur. Nesciunt tempora nobis vero
      fugiat cum eius blanditiis excepturi aliquam suscipit commodi ab iure
      assumenda ipsam repudiandae labore, incidunt iste sapiente, dolorem
      tenetur doloribus hic eum quasi. Magni esse rem, expedita culpa
      praesentium obcaecati quod dignissimos minima, at iste consequuntur
      quaerat! Expedita error adipisci aliquam. Quaerat expedita delectus ad
      officia ex debitis possimus! Iure nisi minus molestiae accusamus
      architecto eveniet cum dolorem. Consectetur, fugit soluta. Corporis nulla
      perspiciatis a quisquam modi quas voluptas, id adipisci enim ipsum sit at
      recusandae, dolorem eius? Eum incidunt doloremque animi accusamus tempora
      maiores cupiditate reiciendis sapiente, quae aut nisi temporibus minima
      nobis dolorem molestiae? Beatae iusto, at modi assumenda sed, nulla facere
      aliquid reprehenderit obcaecati quaerat doloremque tempora ab repudiandae
      facilis consequatur iure aspernatur consectetur tempore quasi tenetur
      explicabo ipsam quidem vitae optio! Magnam dolor nostrum sapiente error
      deserunt, sequi amet, debitis, reprehenderit vitae doloribus incidunt
      labore tenetur laborum veniam! Error amet nam repellat dignissimos saepe
      incidunt neque soluta facere. Eligendi, dignissimos esse nihil voluptatem,
      culpa ad officiis architecto at rerum possimus, accusantium optio
      asperiores qui. Eos minima maxime sequi est sint ea fugit labore iusto,
      aliquam, nihil, consectetur expedita incidunt animi mollitia reprehenderit
      nobis harum doloremque magni quae enim dolores odio veritatis cumque
      eaque? Necessitatibus itaque commodi dolore officiis sequi dignissimos,
      iusto possimus ut tempore delectus inventore veritatis est ducimus fugit
      obcaecati modi omnis tenetur illo! At esse vel deserunt ut maxime in
      necessitatibus accusantium laudantium itaque eius dolor cum soluta vero
      obcaecati numquam voluptate dolorem quos architecto corporis reprehenderit
      totam maiores similique, magnam ipsum. Sapiente omnis ullam voluptatum
      optio assumenda eveniet, adipisci aliquid esse quo laboriosam porro
      nostrum deserunt excepturi tempore modi ab. Veniam enim dolorum blanditiis
      nemo quae obcaecati, molestiae reprehenderit voluptatum iusto ab et
      voluptas maxime necessitatibus magnam, optio illum accusantium quas ea
      nisi in eveniet libero labore architecto quisquam. Dolor quisquam, odio
      dolore eius consequuntur iste veniam ratione ab id et in expedita cumque,
      natus sit labore explicabo officia necessitatibus corrupti repellat quas.
      Suscipit id animi qui. Ea ipsam mollitia at excepturi accusamus iste eum,
      quos in totam odit ducimus nisi, tempora quis enim labore eligendi, magni
      et architecto fugit quod sit? Dolor pariatur fugit omnis dicta nulla.
    </div>
  );
}
